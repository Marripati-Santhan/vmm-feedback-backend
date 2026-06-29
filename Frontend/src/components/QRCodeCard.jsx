import { QRCodeCanvas } from "qrcode.react";

function QRCodeCard() {
  const downloadQRCode = () => {
    const canvas = document.getElementById("vmm-qr");

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink =
      document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download =
      "VMM-Feedback-QR.png";

    document.body.appendChild(
      downloadLink
    );

    downloadLink.click();

    document.body.removeChild(
      downloadLink
    );
  };

  return (
    <div className="card shadow border-0 mt-4">

      <div className="card-body text-center">

        <h5 className="fw-bold">
          Customer QR Code
        </h5>

        <p className="text-muted">
          Scan to open VMM Feedback System
        </p>

        <QRCodeCanvas
          id="vmm-qr"
          value="https://vmm-feedback-system.vercel.app/"
          size={180}
        />

        <div className="mt-3">

          <button
            className="btn btn-success"
            onClick={downloadQRCode}
          >
            Download QR Code
          </button>

        </div>

      </div>

    </div>
  );
}

export default QRCodeCard;