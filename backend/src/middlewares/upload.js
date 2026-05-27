import multer from 'multer';
import path from 'path';

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

    }
});

const upload = multer({ storage });

export default upload;