const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('dist.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
  console.log('Arquivos zipados com sucesso!');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory('dist', false);
archive.finalize();
