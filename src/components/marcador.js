import { Settings } from '../scenes/settings.js';

export class Marcador
{
    constructor(scene, datos)
    {
        this.relatedScene = scene;
        this.datos = datos;
    }

    create()
    {
        const {x, y, size, txt, color, strokeColor, id, resuelto} = this.datos;

        let texto = '';

        if (id === 0) texto = `${txt}`;
        if (id === 2) texto = `${txt}`;

        this.marcador = this.relatedScene.add.text(x, y, texto, {
            fontSize: size + 'px',
            fill: color,
            fontFamily: 'verdana, arial, sans-serif',
            fontStyle: 'bold'
        });

        this.marcador.setOrigin(0, 0.5).setDepth(Settings.depth.marcadores);
        this.marcador.setStroke(strokeColor, 16).setShadow(2, 2, '#111111', 2, false, true);
        //#de77ae #ee9011 #af1

        console.log(this.marcador);
    }

    update(txt, valor)
    {
        this.marcador.setText(`${txt}${valor}`);
    }

    get()
    {
        return this.marcador;
    }
}
