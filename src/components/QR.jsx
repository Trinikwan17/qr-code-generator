import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import "./QR.css";

function QR() {
  const [url, setUrl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const qrRef = useRef(null);

  let handleQR = (event) => 
    {
        event.preventDefault();
        if (url==="")
        {
            return;
        }
        let api = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
        setQrcode(api);
    }
    let handleDownload = () =>
    {
        if(!qrcode)
        {
            return;
        }
        saveAs(qrcode, "qrcode.png");  
    }
    
  return (
    <div className="qr-container">
      <h2>QR Code Generator</h2>
      <form className="qr-form">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="qr-input"
        />
        <button onClick={handleQR} type="submit" className="qr-button">Generate</button>
      </form>

      {qrcode && (
        <div className="qr-image" ref={qrRef}>
          <img src={qrcode} alt="Generated QR Code" />
          <br />
          <button onClick={handleDownload} className="download-button">Download QR</button>
        </div>
      )}
    </div>
  );
}

export default QR;
