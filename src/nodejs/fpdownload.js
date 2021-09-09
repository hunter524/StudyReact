const fs         = require('fs');
const fpdownload = require('download');
// let data ={}
let data ={}
async function download () {
    for (const value of data.data.list) {
        let fpdate = value.add_time.substr(0,10);
        if (!fs.existsSync(fpdate)){
            fs.mkdirSync(fpdate);
        }
        fs.writeFileSync(`${fpdate}/${value.c_buyername}_${value.c_kptype}_${value.fphm}.pdf`,await fpdownload(value.pdf_url));
    }
}
download().then(r => {})

