import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [profileUrl, setProfileUrl] = useState(
    'https://github.com/Lulieeliyas'
  );

  const [generatedUrl, setGeneratedUrl] = useState(
    'https://github.com/Lulieeliyas'
  );

  const qrRef = useRef<HTMLDivElement>(null);

  const generateQR = () => {
    if (!profileUrl.trim()) {
      alert('Please enter a GitHub profile URL.');
      return;
    }

    try {
      const url = new URL(profileUrl.trim());

      if (
        url.protocol !== 'https:' ||
        url.hostname !== 'github.com'
      ) {
        alert('Please enter a valid GitHub profile URL.');
        return;
      }

      setGeneratedUrl(url.toString());
    } catch {
      alert('Please enter a valid URL.');
    }
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');

    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'eliyas-github-qr.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      alert('GitHub profile URL copied successfully!');
    } catch {
      alert('Unable to copy URL. Please copy it manually.');
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <span className="github-icon">GH</span>
          <span>GitHub QR Generator</span>
        </div>

        <a
          href="https://github.com/Lulieeliyas"
          target="_blank"
          rel="noreferrer"
        >
          My GitHub ↗
        </a>
      </header>

      <main className="container">
        <section className="hero">
          <div className="tag">✦ PERSONAL QR GENERATOR</div>

          <h1>
            Share Your GitHub
            <span> With One Scan.</span>
          </h1>

          <p>
            Create a beautiful QR code for your GitHub profile.
            Let people discover your projects, repositories, and work.
          </p>
        </section>

        <section className="generator">
          <div className="input-section">
            <label htmlFor="github-url">
              GitHub Profile URL
            </label>

            <input
              id="github-url"
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://github.com/username"
            />

            <button className="generate-btn" onClick={generateQR}>
              Generate QR Code
            </button>

            <div className="profile-info">
              <div className="avatar">EL</div>

              <div>
                <h3>Eliyas Kindie Lulie</h3>
                <a
                  href="https://github.com/Lulieeliyas"
                  target="_blank"
                  rel="noreferrer"
                >
                  @Lulieeliyas
                </a>
              </div>
            </div>
          </div>

          <div className="qr-section">
            <h2>Your GitHub QR Code</h2>

            <div className="qr-wrapper" ref={qrRef}>
              <QRCodeCanvas
                value={generatedUrl}
                size={240}
                level="H"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#111827"
              />
            </div>

            <p className="scan-text">
              Scan to visit my GitHub profile
            </p>

            <div className="qr-actions">
              <button onClick={downloadQR} className="download-btn">
                ↓ Download PNG
              </button>

              <button onClick={copyURL} className="copy-btn">
                Copy URL
              </button>
            </div>
          </div>
        </section>

        <section className="features">
          <div>
            <span>01</span>
            <h3>Generate</h3>
            <p>Generate your GitHub profile QR code instantly.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Download</h3>
            <p>Save your QR code as a high-quality PNG image.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Share</h3>
            <p>Share your profile with friends and developers.</p>
          </div>
        </section>

        <footer>
          <p>
            © 2026 Eliyas Kindie Lulie | Built with React + TypeScript
          </p>

          <a
            href="https://github.com/Lulieeliyas"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Profile ↗
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;