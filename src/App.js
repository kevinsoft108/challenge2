import React, { useState } from 'react';
import './form.css';

function App() {
  const [files, setFiles] = useState([]);

  function onChangeFile(e) {
    var selected = [];
    for (const file of e.target.files) {
      var errors = [];
      if (file.type !== 'application/pdf') {
        errors.push('Invalid PDF file.');
      }

      if (file.size > 10 * 1024 * 1024) {
        errors.push('File size should be less than 10MB.')
      }

      file.errors = errors.join(' ');
      selected.push(file);
    };
    setFiles(selected);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    alert('File saved successfully.');
    setFiles([]);
  }

  function deleteFile(index) {
    var copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
  }

  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>
        <h1>File Upload</h1>
        <span className="upload-wrapper">
          <button>Select PDF</button>
          <input type="file" multiple={true} onChange={onChangeFile} />
        </span>
        <button type="submit">Save</button>
      </form>
      <table>
        <tbody>
          {files.map((file, i) => (
              <tr key={i}>
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.errors}</td>
                <td><button onClick={() => deleteFile(i)}>Delete</button></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
