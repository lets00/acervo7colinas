import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/capas',
    filename: (req, file, cb) => {
        const nomeArquivo = Date.now() + path.extname(file.originalname);
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage });

export default upload;