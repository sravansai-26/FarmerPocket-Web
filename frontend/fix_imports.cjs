const fs = require('fs');
const path = require('path');

function processDir(dir, depth) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDir(fullPath, depth + 1);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (depth === 1) {
        // Replace '../lib' with '../../lib'
        content = content.replace(/from "\.\.\//g, 'from "../../');
        content = content.replace(/from '\.\.\//g, 'from \'../../');
      } else if (depth === 2) {
        content = content.replace(/from "\.\.\//g, 'from "../../../');
        content = content.replace(/from '\.\.\//g, 'from \'../../../');
      }
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src', 'routes', '_public'), 1);
processDir(path.join(__dirname, 'src', 'routes', 'app'), 1);
console.log('Done!');
