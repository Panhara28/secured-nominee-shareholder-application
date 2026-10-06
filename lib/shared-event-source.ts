// One EventSource per URL per tab, shared by every component listening to it.
//
// Browsers allow only 6 connections per host over HTTP/1.1 and each open
// EventSource holds one for as long as the page lives. With a stream per
// component (bell + list + detail…) two or three open tabs used them all up,
// and every other request — uploads, images, form submits — hung in the queue.
type SharedStreamHandle = {
  onmessage: (() => void) | null;
  close: () => void;
};

const streams = new Map<string, { source: EventSource; handles: Set<SharedStreamHandle> }>();

/** Drop-in for `new EventSource(url)` where only `onmessage` and `close()` are used. */
export function sharedEventSource(url: string): SharedStreamHandle {
  let stream = streams.get(url);
  if (!stream) {
    const created = { source: new EventSource(url), handles: new Set<SharedStreamHandle>() };
    created.source.onmessage = () => created.handles.forEach((h) => h.onmessage?.());
    streams.set(url, created);
    stream = created;
  }
  const shared = stream;

  const handle: SharedStreamHandle = {
    onmessage: null,
    close: () => {
      shared.handles.delete(handle);
      if (shared.handles.size === 0 && streams.get(url) === shared) {
        shared.source.close();
        streams.delete(url);
      }
    },
  };
  shared.handles.add(handle);
  return handle;
}
