import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './pages.css';

const WelcomePage: React.FC = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleDescription = () => {
    setShowMore((prevState) => !prevState);
  };

  return (
    <div className="welcome-container">
      <Card
        title="Welcome to Hasil Docs"
        className="welcome-card"
        style={{ maxWidth: '80%' }}
      >
        <h2>Your New Document Editor</h2>
        <p>
          Hasil Docs is your next-generation document editing platform.
          It's designed to make writing and collaboration easier than ever.
        </p>
        <p>
          Just like Google Docs, Hasil Docs allows you to create, edit, and
          share documents in real-time, making teamwork more efficient.
        </p>
        <Button
          label="Start Writing"
          onClick={toggleDescription}
          className="p-button-primary welcome-button"
        />

        {showMore && (
          <div className="extra-description">
            <p>
              With features that enable real-time editing, auto-save, and a
              clean, intuitive interface, Hasil Docs is your ideal tool for
              creating and managing your documents.
            </p>
          </div>
        )}
      </Card>

      {/* Optional canvas or other interactive elements can go here */}
    </div>
  );
};

export default WelcomePage;

