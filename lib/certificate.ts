import path from "node:path";
import { Column, Row, Text, Span, Photo, Font, qrcode, sone } from "sone";

// ── FONTS ─────────────────────────────────────────────
let fontsLoaded: Promise<void> | null = null;

function loadFonts(): Promise<void> {
  if (!fontsLoaded) {
    const fontsDir = path.join(process.cwd(), "public/fonts");
    fontsLoaded = Promise.all([
      Font.load("Siemreap", path.join(fontsDir, "Siemreap/Siemreap-Regular.ttf")),
      Font.load("Moul", path.join(fontsDir, "Moul/Moul-Regular.ttf")),
    ]).then(() => undefined);
  }
  return fontsLoaded;
}

const BODY = "Siemreap";
const HEAD = "Moul";
const INK = "black";

function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function qrDataUri(data: string): string {
  const svg = qrcode(data, { pixelSize: 8 });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function Header() {
  return Row(
    Photo(path.join(process.cwd(), "public/cert-logo.png")).width(110).height(110).scaleType("contain"),
    Column().flex(1),
    Column(
      Text("ព្រះរាជាណាចក្រកម្ពុជា").font(HEAD).weight("bold").size(15).color(INK).align("center"),
      Text("ជាតិ សាសនា ព្រះមហាក្សត្រ").font(HEAD).weight("bold").size(13).color(INK).align("center"),
      Text("————— ✧ —————").size(9).color(INK).align("center")
    ).gap(5).alignItems("center").padding(6, 0, 0, 0)
  ).alignItems("flex-start");
}

function MinistryLabel() {
  return Column(
    Text("ក្រសួងពាណិជ្ជកម្ម").font(HEAD).weight("bold").size(13).color(INK),
    Text("MINISTRY OF COMMERCE").font(BODY).size(11).weight("bold").color(INK),
    Text("លេខលិខិតបញ្ជាក់ ៖ .....................").font(BODY).size(11).color(INK),
    Text("កាលបរិច្ឆេទ ៖ .............................").font(BODY).size(11).color(INK)
  ).gap(4);
}

function Title() {
  return Column(
    Text("លិខិតបញ្ជាក់").font(HEAD).weight("bold").size(16).color(INK).align("center"),
    Text("ការទទួលការតម្កល់កិច្ចសន្យាតំណាងម្ចាស់ភាគហ៊ុន")
      .font(HEAD).weight("bold").size(13).color(INK).align("center")
  ).gap(6).alignItems("center");
}

function Body(data: CertificateData, companyLine: string) {
  const lh = 1.9;
  return Column(
    Text("ក្រុមហ៊ុន  ", Span(companyLine).weight("bold"))
      .font(BODY).size(12).color(INK).lineHeight(lh),

    Text(
      "អត្តលេខចុះបញ្ជី : ",
      Span(data.registrationNo).weight("bold"),
      "     កាលបរិច្ឆេទចុះបញ្ជី : ",
      Span(formatDate(data.registrationDate)).weight("bold")
    ).font(BODY).size(12).color(INK).lineHeight(lh),

    Text(
      "ក្រសួងពាណិជ្ជកម្ម  សូមបញ្ជាក់ថា  ក្រុមហ៊ុនបានការតម្កល់ព័ត៌មាន  " +
      "និងកិច្ចសន្យារវាងម្ចាស់ភាគហ៊ុនដែលជាអត្ថគាហកចុងក្រោយ  " +
      "និងអ្នកតំណាងម្ចាស់ភាគហ៊ុនតាមប្រព័ន្ធស្វ័យប្រវត្តិកម្ម  ដែលមាន"
    ).font(BODY).size(12).color(INK).lineHeight(lh).align("justify"),

    Text("លេខតម្កល់ : ", Span(`${data.requestNo}  ( Number Generate by System )`))
      .font(BODY).size(12).weight("bold").color(INK).lineHeight(lh),

    Text("កាលបរិច្ឆេទតម្កល់ : ", Span(formatDate(data.approvedAt)))
      .font(BODY).size(12).weight("bold").color(INK).lineHeight(lh),

    Text(
      "ក្រុមហ៊ុនត្រូវរក្សាទុកនូវរាល់ព័ត៌មាន  " +
      "និងឯកសារពាក់ព័ន្ធនឹងម្ចាស់ភាគហ៊ុនដែលជាអត្ថគាហកចុងក្រោយ  " +
      "និងអ្នកតំណាងម្ចាស់ភាគហ៊ុននៅទីស្នាក់ការរបស់ក្រុមហ៊ុនស្របតាមច្បាប់ជាធរមាន" +
      "ចាប់កាលបរិច្ឆេទតម្កល់។"
    ).font(BODY).size(12).color(INK).lineHeight(lh).align("justify"),

    Text(
      "លិខិតបញ្ជាក់នេះ  ត្រូវបានចេញជូនសម្រាប់បញ្ជាក់ការទទួលតម្កល់ព័ត៌មាន  " +
      "និងតម្កល់កិច្ចសន្យាតំណាងម្ចាស់ភាគហ៊ុន នៅក្រសួងពាណិជ្ជកម្ម។"
    ).font(BODY).size(12).color(INK).lineHeight(lh).align("justify")
  ).gap(12);
}

function QrBox(qr: string) {
  return Row(
    Column().flex(1),
    Column(
      Photo(qr).width(90).height(90),
      Text("Verify").font(BODY).size(10).weight("bold").color(INK).align("center")
    )
      .width(120).height(120)
      .borderWidth(1.5).borderColor(INK)
      .justifyContent("center").alignItems("center").gap(4)
  );
}

export type CertificateData = {
  requestNo: string;
  companyNameEn: string;
  companyNameKh: string | null;
  registrationNo: string;
  registrationDate: Date;
  approvedAt: Date;
};

function Document(data: CertificateData, qr: string, companyLine: string) {
  return Column(
    Header(),
    MinistryLabel(),
    Column().height(8),
    Title(),
    Column().height(8),
    Body(data, companyLine),
    Column().height(30),
    QrBox(qr)
  )
    .gap(14)
    .padding(48)
    .bg("white")
    .width(794); // A4 @ 96dpi
}

export async function generateCertificatePdf(data: CertificateData): Promise<Buffer> {
  await loadFonts();

  const qr = qrDataUri(`SNSA-CERT:${data.requestNo}`);
  const companyLine = data.companyNameKh
    ? `${data.companyNameKh} / ${data.companyNameEn}`
    : data.companyNameEn;

  return sone(Document(data, qr, companyLine)).pdf();
}
