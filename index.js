import fs from 'fs';
import parser from 'csv-parser';
import crypto from 'crypto';

const filePath = './data/annual-enterprise-survey-2020-financial-year-provisional-csv.csv';

const results = [];
let str = '';

fs.createReadStream(filePath)
    .pipe(parser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);

        for(let i = 0; i < results.length; i = i + 2) {
            str = str + results[i]['Industry_code_NZSIOC']
        }

        console.log('res', str);

        const hash = crypto.createHash('md5').update(str).digest('hex');

        console.log('Hashed', hash);
    });