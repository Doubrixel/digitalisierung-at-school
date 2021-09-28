import React from 'react';
import { Paper } from '@material-ui/core';

function UploadedFileInformationPanel(
  {
    width = '90vw',
    filename = '',
    filesize = '',
    fileProvidedAtDate = '',
    // eslint-disable-next-line react/require-default-props
  }: { width?: string, filename?: string, filesize?: string, fileProvidedAtDate?: string },
) {
  return (
    <Paper style={{
      display: 'flex', flexDirection: 'column', width, padding: '2vw', marginTop: '2vh', marginBottom: '2vh',
    }}
    >
      <h3>Dateien anhängen und speichern</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <text>
          Dateiname:
          { ` ${filename}` }
        </text>
        <text>
          Dateigröße:
          { ` ${filesize}` }
        </text>
        <text>
          Datei bereitgestellt am:
          { ` ${fileProvidedAtDate}` }
        </text>
      </div>
    </Paper>
  );
}

export default UploadedFileInformationPanel;
