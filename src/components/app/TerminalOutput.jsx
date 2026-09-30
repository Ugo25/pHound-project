import React, { useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import styles from './TerminalOutput.module.css';

const TerminalOutput = ({ output, autoScroll = true, showLineNumbers = true }) => {
  const [copied, setCopied] = React.useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (autoScroll && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output, autoScroll]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = output.split('\n');

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dotRed}></span>
          <span className={styles.dotYellow}></span>
          <span className={styles.dotGreen}></span>
        </div>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className={styles.content}>
        {lines.map((line, i) => (
          <div key={i} className={styles.line}>
            {showLineNumbers && <span className={styles.lineNumber}>{i + 1}</span>}
            <span className={styles.lineContent}>{line || ' '}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default TerminalOutput;
