import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file.fieldname === 'img') {
            cb(null, 'public/capas');
        }

        else if (file.fieldname === 'fotoPerfil') {
            cb(null, 'public/perfil');
        }

        else if (file.fieldname === 'fotoRg') {
            cb(null, 'public/rg');
        }

        else if (file.fieldname === 'comprovanteResidencial') {
            cb(null, 'public/residencia');
        }

        else if (file.fieldname === 'fotoCnh') {
            cb(null, 'public/cnh');
        }
    },

    filename: (req, file, cb) => {
        const extensao = path.extname(file.originalname);

        cb(
            null,
            `${uuidv4()}${extensao}`
        );
    }
});

const upload = multer({ storage });

export default upload;