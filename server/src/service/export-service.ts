
const Json2csvParser = require('json2csv').Parser;

export class ExportService {
    ConvertJsonToCsv(dataToParse: string) {
        // const fields = ['field1', 'field2', 'field3'];
        // const opts = { fields };

        try {
            // const parser = new Json2csvParser(opts);
            const parser = new Json2csvParser();
            // const csv = parser.parse(dataToParce);
            return parser.parse(dataToParse);
        } catch (err) {
            console.error(err);
            return err;
        }

    }
}