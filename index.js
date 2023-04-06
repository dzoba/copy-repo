const glob = require('glob');
const fs = require('fs');
const path = require('path');

function readJSFiles(repoPath, outputPath, config) {
  const { include, exclude } = config;

  const includePatterns = (Array.isArray(include) ? include : [include]).map((pattern) => path.join(repoPath, pattern));
  const excludePatterns = (Array.isArray(exclude) ? exclude : [exclude]).map((pattern) => path.join(repoPath, pattern));

  const globOptions = {
    ignore: excludePatterns,
  };

  const outputData = [];

  function processNextPattern(index) {
    if (index >= includePatterns.length) {
      fs.writeFile(outputPath, outputData.join('\n'), 'utf8', (err) => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }
        console.log(`JS code written to ${outputPath}`);
      });
      return;
    }

    const pattern = includePatterns[index];

    glob(pattern, globOptions, (err, files) => {
      if (err) {
        console.error('Error reading JS files:', err);
        return;
      }

      outputData.push(
        ...files.map((file) => {
          const content = fs.readFileSync(file, 'utf8');
          const filename = path.basename(file);
          return `*** ${filename} ***\n${content}\n`;
        }),
      );

      processNextPattern(index + 1);
    });
  }

  processNextPattern(0);
}

module.exports = readJSFiles;
