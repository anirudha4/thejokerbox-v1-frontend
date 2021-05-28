import jpg from "../assets/img/jpg.svg";
import pdf from "../assets/img/pdf.svg";
import code from "../assets/img/code.svg";
import svg from "../assets/img/svg.svg";
import docx from "../assets/img/doc.svg";
import mp4 from "../assets/img/mp4.svg";
import png from "../assets/img/png.svg";
import txt from "../assets/img/txt.svg";
import ppt from "../assets/img/ppt.svg";
import xls from "../assets/img/xls.svg";
import css from "../assets/img/css.svg";
import any from "../assets/img/file.svg";

export default function setExtensionImage (ext) {
    if(ext.toLowerCase() === 'png') return png
    else if(ext.toLowerCase() === 'jpg' ) return jpg
    else if(ext.toLowerCase() === 'ppt' ) return ppt
    else if(ext.toLowerCase() === 'xls' ) return xls
    else if(ext.toLowerCase() === 'css' ) return css
    else if(ext.toLowerCase() === 'txt' || ext.toLowerCase() === 'plain' ) return txt
    else if(ext.toLowerCase() === 'mp4' ) return mp4
    else if(ext.toLowerCase() === 'docx' ) return docx
    else if(ext.toLowerCase() === 'code' ) return code
    else if(ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg' ) return jpg
    else if(ext.toLowerCase() === 'svg' ) return svg
    else if(ext.toLowerCase() === 'pdf' ) return pdf
    else return any
}