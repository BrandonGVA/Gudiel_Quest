import Phaser from 'phaser';

const TILE_SIZE = 32;

const gameState = {
    spawnX: 1450,
    spawnY: 336,
    heldItems: [],
    pickedUp: {},
    delivered: {},
    finished: false
};

const ITEM_ASSETS = {
    gacht: { file: '/rosaamarilla.png', label: 'rosa amarilla' },
    ireni: { file: '/moño.png', label: 'moño' },
    bleu: { file: '/hamburguesa.png', label: 'hamburguesa mordida' },
    guadalupe: { file: '/vodka.png', label: 'vodka' },
    fanicot: { file: '/meica.png', label: 'meica de peluche' },
    mayo: { file: '/mayonesa.png', label: 'mayonesa' },
    rebage: { file: '/camisa.png', label: 'camisa' },
    yiro: { file: '/copodenieve.png', label: 'copo de nieve' },
    sushi: { file: '/brujula.png', label: 'brújula' },
    brand: { file: '/flordecerezo.png', label: 'flor de cerezo' },
    santi: { file: '/gafas.png', label: 'gafas' },
    graniel: { file: '/computadora.png', label: 'computadora' }
};

const WORLD_ITEM_SPAWNS = {
    mundo1: [
        { key: 'gacht', x: 41, y: 22 },
        { key: 'ireni', x: 14, y: 14 },
        { key: 'bleu', x: 3, y: 22 },
        { key: 'guadalupe', x: 13, y: 36 }
    ],
    mundo2: [
        { key: 'fanicot', x: 42, y: 11 },
        { key: 'mayo', x: 15, y: 4 },
        { key: 'rebage', x: 7, y: 11 },
        { key: 'yiro', x: 37, y: 31 }
    ],
    mundo3: [
        { key: 'sushi', x: 14, y: 30 },
        { key: 'brand', x: 44, y: 42 },
        { key: 'santi', x: 47, y: 30 },
        { key: 'graniel', x: 19, y: 23 }
    ]
};

const CABIN_ALTARS = [
    { x: 13, y: 8 },
    { x: 6, y: 8 },
    { x: 5, y: 6 },
    { x: 14, y: 6 },
    { x: 4, y: 4 },
    { x: 9, y: 2 },
    { x: 13, y: 2 },
    { x: 15, y: 4 },
    { x: 16, y: 2 },
    { x: 11, y: 2 },
    { x: 6, y: 2 },
    { x: 3, y: 2 }
];

const BIRTHDAY_MESSAGES = {
    gacht: 'BUENAAAA Gudiel my brotherrrr. Feliz cumpleaños. Ojala la haya pasado mega bien. Lo hayan consentido y reventarle el bizcocho JAJAJAJA. Bueno ya enserio mi bro. Ojala la hayas pasado re bien te haya gustado la sorpresa. Sobran palabras para decirte lo agradecido que estoy contigo de que estes en esta comunidad, gracias por estar aquí, gracias por el apoyo y sobretodo por ser una excelente persona. Feliz cumpleaños licenciado! -Gacht.',
    ireni: 'Feliz cumpleaños Gudiel! Aunque no hablamos mucho, quería desearte que pases un día increíble. Gracias por las risas y por todos esos momentos graciosos que han salido en los streams de rebage y del gato. (Encueren a Rebage). Espero que la pases súper bien, que este nuevo año te traiga muchas cosas buenas y éxitos. -Ireni.',
    bleu: 'GUDIEEEEEL FELIZ CUMPLEAÑOS, espero que la pases o lo hayas pasado bien en tu día, que comas mucho pastel y así. -Bleu.',
    guadalupe: 'Feliz cumpleaños gudieeee. Muchas gracias por todo el apoyo que me has dado durante mi estadia en la mandanga y la verdad no me alcanzan las palabras para expresar mi gratitud contigo. Mas que nada muchas gracias por las risas, los momentos divertidos en la comunidad. Se te quiere mucho Gudiel. Eres una muy buena persona y recuerda sonreir siempre. Se te quiere mucho gudiel y felicidades. -Guadalupe.',
    fanicot: 'Como anda el patron feliz cumple, no hablamos mucho pero aun asi te puedo decir que sos una tremenda persona que siempre que puede ayuda al resto con lo que necesite o aporta su parte. Que tengas un buen dia y soples muchas velas. -Fanicot.',
    mayo: 'Hola, Gudiel, ojalá hayas disfrutado de este día tan especial. Nosotros no solemos hablar mucho, pero siempre hay momentos divertidos o buenas charlas cuando estás, además del buen ambiente que le das a toda la gente de la mandanga y a la comunidad de Rebage en fin feliz cumpleaños, Gudiel, y que cumplas muchos más. -Mayo.',
    rebage: 'Feliz cumpleaños mi estimado don Gudiel 🎉. Hoy quería aprovechar para agradecerte por toda la ayuda que le has brindado a la comunidad y por el apoyo que siempre das. Eres una persona trabajadora, dedicada y alguien a quien muchos apreciamos de verdad. Personalmente, me alegra mucho haberte conocido y haber compartido contigo dentro de esta comunidad. Espero que tengas un día increíble, rodeado de las personas que te quieren, y que este nuevo año te traiga mucha salud, felicidad y éxitos. Se le quiere mucho, le deseo un muy feliz cumpleaños y que cumpla muchísimos años más. Que disfrute mucho su día! -Rebage',
    yiro: 'Feliz cumpleaños, Gudiel🎂. Espero que hoy tengas un día increíble, rodeado de las personas que más aprecias. Te deseo mucha salud, felicidad y éxito en todo lo que te propongas. Que este nuevo año de vida venga lleno de buenos momentos, nuevas oportunidades y muchas razones para sonreír. Disfruta mucho tu día y que todos tus deseos se hagan realidad. Muchas felicidades y que la pases excelente.🥳🎁. -Yiro.',
    sushi: 'Otro año más para ti, quién lo diría, y aquí estoy escribiéndote unas líneas este día. No soy muy bueno expresando toooodo lo que siento, pero hoy quería dejarlo escrito aunque sea por un momento. Porque entre tantas personas que pude conocer, terminaste siendo alguien que vale la pena tener. Con tus ocurrencias, tus risas y tu forma de ser, hiciste que más de un día fuera mejor sin saber. No sé si lo digo seguido o si lo digo poco, pero agradezco haberte encontrado entre tanto loco. Porque una amistad como la tuya no aparece cada rato, y por eso cada recuerdo contigo lo guardo con agrado. Hoy no solo te deseo felicidad y diversión, también que nunca te falte ilusión. Que cumplas tus metas, que te vaya genial, porque si alguien merece cosas buenas, eres tú al final. Así que disfruta mucho este día especial, ríe, celebra y pásala brutal. Y antes de terminar este pequeño escrito, feliz cumpleaños, Gudiel, te quiero muchísimo, amiguito. <33 -Sushi.',
    brand: 'Como esta Gudiel? espero que muy bien y que haya disfrutado de su dia especial, aqui en la comunidad usted es alguien muy importante y querido por todos no solo por la cantidad de apoyo que da si no tambien por estar siempre presente en los buenos y en los malos momentos, espero que todo lo que hagas y hiciste sean para bien y que tengas el mejor feliz cumpleaños que hayas tenido, lo hicimos con mucho cariño. -Brand.',
    santi: '¡¡Feliz cumpleaños Gudiel!!, en este día no solo celebramos tu cumpleaños, también es un recordatorio de la persona tan maravillosa y generosa que eres, que todos tus proyectos encuentren el camino del éxito y que nunca te falte salud. Gracias por estar aquí pana Gudiel. -Santi',
    graniel: 'Buenas Gudiel, puede que no hablemos tanto como para decir que somos muy cercanos, sin embargo he pasado momentos muy divertidos contigo en chats y en los streams que hemos estado. Te deseo un muy feliz cumpleaños y que lo disfrutes mucho, no solo en el día si no en general, porque... ¿qué sería la vida si uno no disfruta lo que hace? -Graniel.'
};

const FINAL_IMAGE_PATH = '/FelizCumple.png';

class SceneMap extends Phaser.Scene {
    constructor(key, mapaFile, portalConfig) {
        super(key);

        this.mapaFile = mapaFile;
        this.portalConfig = portalConfig;

        this.collectibles = [];
        this.pillars = [];
        this.finalShown = false;
        this.messageUntil = 0;

        this.cardModalOpen = false;
        this.pendingFinalScreen = false;
        this.activeCardKey = null;

        this.cardOverlay = null;
        this.envelopePanel = null;
        this.letterPanel = null;
        this.cardTitleText = null;
        this.cardBodyText = null;
        this.closeCardButton = null;
    }

    preload() {
        this.load.image('JapanImg', '/Tilemap.png');
        this.load.image('FarmImg', '/[KT]JapaneseFarmHouse_Basic.png');
        this.load.image('DetalladoImg', '/ProjectUtumno_full.png');

        this.load.spritesheet('gudiel', '/Player.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        Object.entries(ITEM_ASSETS).forEach(([key, data]) => {
            this.load.image(key, data.file);
        });

        this.load.image('birthdayFinal', FINAL_IMAGE_PATH);
        this.load.audio('homeMusic', '/Home.mp3');
        this.load.audio('finalMusic', '/Final.mp3');
        this.load.audio('paperOpen', '/paperOpen.mp3');
        this.load.audio('pickup', '/itemPickup.mp3');

        this.load.tilemapTiledJSON(
            this.mapaFile,
            `/${this.mapaFile}.tmj`
        );
    }

    create() {

        console.log('Entrando a', this.mapaFile);
        console.log('Jugador creado');
        this.cameras.main.setBackgroundColor('#000000');

        const map = this.make.tilemap({
            key: this.mapaFile
        });

        if (!map) {
            console.error(`No se pudo cargar el mapa: ${this.mapaFile}`);
            return;
        }

        this.map = map;

        const tsJapan = map.addTilesetImage('Japan', 'JapanImg');
        const tsFarm = map.addTilesetImage('farm japonesa', 'FarmImg');
        const tsDetallado = map.addTilesetImage('Detallado3', 'DetalladoImg');

        const allTilesets = [tsJapan, tsFarm, tsDetallado].filter(Boolean);

        if (allTilesets.length === 0) {
            console.error('No se encontró ningún tileset válido');
            return;
        }

        map.layers.forEach(layerData => {
            const layer = map.createLayer(
                layerData.name,
                allTilesets,
                0,
                0
            );

            if (!layer) {
                console.warn(`No se pudo crear la capa: ${layerData.name}`);
            }
        });

        let collisionLayerName = '';

        switch (this.mapaFile) {
            case 'mundo1':
                collisionLayerName = 'colisionesm1';
                break;
            case 'mundo2':
                collisionLayerName = 'colisionesm2';
                break;
            case 'mundo3':
                collisionLayerName = 'colisionesm3';
                break;
            case 'cabaña':
                collisionLayerName = 'colisionescb';
                break;
        }

        const collisionLayer = this.children.list.find(
            obj => obj.layer && obj.layer.name === collisionLayerName
        );

       if (!collisionLayer) {
    console.warn(`No se encontró la capa de colisiones: ${collisionLayerName}`);
} else {
    collisionLayer.setCollisionByExclusion([-1]);
    this.collisionLayer = collisionLayer;
    this.removeInvisibleCollisionTiles();
    console.log(`Colisiones cargadas desde: ${collisionLayerName}`);
}
        this.player = this.physics.add.sprite(
            gameState.spawnX,
            gameState.spawnY,
            'gudiel'
        );
this.pickupSfx = this.sound.add('pickup');
this.paperOpenSfx = this.sound.add('paperOpen');


        this.player.setCollideWorldBounds(true);
        this.player.lastDirection = 'down';
        this.player.setFrame(10);
        this.player.body.setSize(24, 24);
        this.player.body.setOffset(2, 3);

this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('gudiel', {
        start: 0,
        end: 2
    }),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('gudiel', {
        start: 3,
        end: 5
    }),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers('gudiel', {
        start: 6,
        end: 8
    }),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('gudiel', {
        start: 9,
        end: 11
    }),
    frameRate: 8,
    repeat: -1
});


        if (this.collisionLayer) {
            this.physics.add.collider(this.player, this.collisionLayer);
        }

        this.cameras.main.startFollow(this.player);
if (this.mapaFile === 'cabaña') {
    this.cameras.main.setZoom(1);
}
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

if (this.mapaFile === 'cabaña') {
    this.cameras.main.setBounds(
        0,
        0,
        640,
        480
    );
}

        this.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
            downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN,
            leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            interact: Phaser.Input.Keyboard.KeyCodes.F
        });

        this.promptBg = this.add.rectangle(400, 545, 760, 52, 0x000000, 0.65)
            .setScrollFactor(0)
            .setDepth(1000)
            .setVisible(false);

        this.promptText = this.add.text(30, 527, '', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            wordWrap: { width: 700 }
        })
            .setScrollFactor(0)
            .setDepth(1001)
            .setVisible(false);

        this.messageText = this.add.text(400, 40, '', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#000000aa',
            padding: { left: 12, right: 12, top: 8, bottom: 8 }
        })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1002)
            .setVisible(false);

        this.hidePrompt();
        this.hideMessage();

        this.createCardModal();
        this.createItemsForWorld();
        this.createPillars(map);
        this.playMusic();
    }

    getObjectLayer(map, possibleNames) {
        for (const name of possibleNames) {
            const layer = map.getObjectLayer(name);
            if (layer) return layer;
        }
        return null;
    }

    getObjectProps(obj) {
        const props = {};
        if (Array.isArray(obj.properties)) {
            obj.properties.forEach(p => {
                props[p.name] = p.value;
            });
        }
        return props;
    }

removeInvisibleCollisionTiles() {
    if (!this.collisionLayer) return;

    const fixes = {
        mundo2: [
            { x: 22, y: 31 },
            { x: 22, y: 32 }
        ],
        cabaña: [
            { x: 11, y: 4 },
            { x: 13, y: 3 }
        ]
    };

    const coords = fixes[this.mapaFile] || [];

    coords.forEach(({ x, y }) => {
        const tile = this.collisionLayer.getTileAt(x, y);
        if (tile) {
            tile.setCollision(false, false, false, false);
        }
    });
}


    createItemsForWorld() {
        const spawns = WORLD_ITEM_SPAWNS[this.mapaFile] || [];

        spawns.forEach(spawn => {
            if (gameState.pickedUp[spawn.key] || gameState.delivered[spawn.key]) {
                return;
            }

            const sprite = this.physics.add.sprite(
                spawn.x * TILE_SIZE + 16,
                spawn.y * TILE_SIZE + 16,
                spawn.key
            );

            sprite.setImmovable(true);
            sprite.body.setAllowGravity(false);
            sprite.setDepth(20);
            sprite.setData('itemKey', spawn.key);

            this.collectibles.push(sprite);

            this.physics.add.overlap(
                this.player,
                sprite,
                () => this.pickUpItem(sprite),
                null,
                this
            );
        });
    }

    createPillars(map) {
        this.pillars = [];

        if (this.mapaFile === 'cabaña') {
            this.pillars = CABIN_ALTARS.map(pos => ({
                x: pos.x * TILE_SIZE + 16,
                y: pos.y * TILE_SIZE + 16,
                itemKey: null,
                delivered: false
            }));
            return;
        }

        const pillarLayer = this.getObjectLayer(map, [
            'pilares',
            'Pilares',
            'pedestales',
            'Pedestales',
            'altar',
            'Altar'
        ]);

        if (!pillarLayer) {
            return;
        }

        pillarLayer.objects.forEach(obj => {
            const props = this.getObjectProps(obj);

            const itemKey =
                props.itemKey ||
                obj.name ||
                obj.type ||
                null;

            const x = obj.x + ((obj.width || TILE_SIZE) / 2);
            const y = obj.y + ((obj.height || TILE_SIZE) / 2);

            this.pillars.push({
                x,
                y,
                itemKey,
                delivered: itemKey ? !!gameState.delivered[itemKey] : false
            });
        });
    }

    pickUpItem(sprite) {
        const itemKey = sprite.getData('itemKey');

        if (!itemKey) return;

        if (gameState.pickedUp[itemKey] || gameState.delivered[itemKey]) {
            return;
        }

        gameState.heldItems.push(itemKey);
        gameState.pickedUp[itemKey] = true;

        sprite.disableBody(true, true);

this.sound.play('pickup');

        const label = ITEM_ASSETS[itemKey]?.label || itemKey;
        this.showMessage(`Has recogido ${label}.`);
    }

    findNearbyPillar() {
        let nearest = null;
        let bestDistance = 28;

        this.pillars.forEach(pillar => {
            if (pillar.delivered) return;

            const d = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                pillar.x,
                pillar.y
            );

            if (d <= bestDistance) {
                bestDistance = d;
                nearest = pillar;
            }
        });

        return nearest;
    }

    showPrompt(text) {
        this.promptBg.setVisible(true);
        this.promptText.setText(text);
        this.promptText.setVisible(true);
    }

    hidePrompt() {
        if (this.promptBg) this.promptBg.setVisible(false);
        if (this.promptText) {
            this.promptText.setText('');
            this.promptText.setVisible(false);
        }
    }

    showMessage(text, duration = 2200) {
        this.messageText.setText(text);
        this.messageText.setVisible(true);
        this.messageUntil = this.time.now + duration;
    }

    hideMessage() {
        if (this.messageText) {
            this.messageText.setText('');
            this.messageText.setVisible(false);
        }
        this.messageUntil = 0;
    }

    createCardModal() {
    this.cardOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.82)
        .setScrollFactor(0)
        .setDepth(3000)
        .setVisible(false);

    this.envelopePanel = this.add.container(400, 300)
        .setScrollFactor(0)
        .setDepth(3001)
        .setVisible(false);

    const envelopeGfx = this.add.graphics();

    envelopeGfx.fillStyle(0xf5e2c8, 1);
    envelopeGfx.lineStyle(4, 0x8b5a2b, 1);

    envelopeGfx.fillRect(-160, -100, 320, 200);
    envelopeGfx.strokeRect(-160, -100, 320, 200);

    envelopeGfx.fillStyle(0xe0c09a, 1);
    envelopeGfx.fillTriangle(-160, -100, 160, -100, 0, -18);
    envelopeGfx.strokeTriangle(-160, -100, 160, -100, 0, -18);

    const envelopeText = this.add.text(0, 58, 'Haz clic para abrir el sobre', {
        fontFamily: 'Arial',
        fontSize: '17px',
        color: '#4a2f1a',
        align: 'center',
        wordWrap: { width: 250 }
    }).setOrigin(0.5);

    const envelopeClick = this.add.rectangle(0, 0, 320, 200, 0x000000, 0.001)
        .setInteractive({ useHandCursor: true });

    envelopeClick.on('pointerdown', () => {
    if (!this.cardModalOpen) return;

    this.sound.play('paperOpen', {
        volume: 0.8
    });

    this.envelopePanel.setVisible(false);
    this.letterPanel.setVisible(true);
});

    this.envelopePanel.add([
        envelopeGfx,
        envelopeText,
        envelopeClick
    ]);

    this.letterPanel = this.add.container(400, 300)
        .setScrollFactor(0)
        .setDepth(3002)
        .setVisible(false);

    const letterBg = this.add.rectangle(0, 0, 620, 440, 0xfff9ef)
        .setStrokeStyle(4, 0x8b5a2b);

    this.cardTitleText = this.add.text(0, -185, 'Carta de cumpleaños', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#4a2f1a',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    this.cardBodyText = this.add.text(0, 0, '', {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#2e1c10',
        wordWrap: { width: 520 },
        align: 'center',
        lineSpacing: 2
    }).setOrigin(0.5);

    this.closeCardButton = this.add.text(290, -205, 'X', {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#ffffff',
        backgroundColor: '#c0392b',
        padding: { left: 8, right: 8, top: 2, bottom: 2 }
    })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

    this.closeCardButton.on('pointerdown', () => {
        this.closeBirthdayCard();
    });

    this.letterPanel.add([
        letterBg,
        this.cardTitleText,
        this.cardBodyText,
        this.closeCardButton
    ]);
}

    openBirthdayCard(key) {
    this.activeCardKey = key;
    this.cardModalOpen = true;
    this.pendingFinalScreen = Object.keys(gameState.delivered).length >= Object.keys(ITEM_ASSETS).length;

    const msg = BIRTHDAY_MESSAGES[key] || 'Mensaje entregado.';

    this.hidePrompt();
    this.hideMessage();

    const size =
        msg.length > 1100 ? 10 :
        msg.length > 800 ? 11 :
        msg.length > 500 ? 12 : 13;

    this.cardOverlay.setVisible(true);
    this.envelopePanel.setVisible(true);
    this.letterPanel.setVisible(false);

    this.cardTitleText.setText('Carta de cumpleaños');
    this.cardBodyText.setFontSize(size);
    this.cardBodyText.setText(msg);
}

    closeBirthdayCard() {
        this.cardModalOpen = false;
        this.activeCardKey = null;

        this.cardOverlay.setVisible(false);
        this.envelopePanel.setVisible(false);
        this.letterPanel.setVisible(false);

        if (this.pendingFinalScreen) {
            this.pendingFinalScreen = false;
            this.showFinalScreen();
        }
    }

    playMusic() {
        const isCabin = this.mapaFile === 'cabaña';

        const homeMusic = this.sound.get('homeMusic');
        const finalMusic = this.sound.get('finalMusic');

        if (isCabin) {
            if (homeMusic && homeMusic.isPlaying) {
                homeMusic.stop();
            }

            if (!finalMusic) {
                this.sound.add('finalMusic', {
                    loop: true,
                    volume: 0.5
                }).play();
            } else if (!finalMusic.isPlaying) {
                finalMusic.play();
            }
        } else {
            if (finalMusic && finalMusic.isPlaying) {
                finalMusic.stop();
            }

            if (!homeMusic) {
                this.sound.add('homeMusic', {
                    loop: true,
                    volume: 0.5
                }).play();
            } else if (!homeMusic.isPlaying) {
                homeMusic.play();
            }
        }
    }

    setFacingFrame(direction) {
        switch (direction) {
            case 'up':
                this.player.setFrame(1);
                break;
            case 'left':
                this.player.setFrame(4);
                break;
            case 'right':
                this.player.setFrame(7);
                break;
            case 'down':
            default:
                this.player.setFrame(10);
                break;
        }
    }

    depositItem(pillar) {
        if (gameState.heldItems.length === 0) {
            this.showMessage('Necesitas llevar un objeto antes de usar el pedestal.');
            return;
        }

        let deliveredKey = null;

        if (pillar.itemKey) {
            const index = gameState.heldItems.indexOf(pillar.itemKey);

            if (index === -1) {
                this.showMessage('Ese objeto no va en este pedestal.');
                return;
            }

            deliveredKey = pillar.itemKey;
            gameState.heldItems.splice(index, 1);
        } else {
            deliveredKey = gameState.heldItems.shift();
        }

        gameState.delivered[deliveredKey] = true;
        pillar.delivered = true;

        this.openBirthdayCard(deliveredKey);
    }

    showFinalScreen() {
        if (this.finalShown) return;
        this.finalShown = true;

        this.cardModalOpen = false;
        this.pendingFinalScreen = false;

        if (this.cardOverlay) this.cardOverlay.setVisible(false);
        if (this.envelopePanel) this.envelopePanel.setVisible(false);
        if (this.letterPanel) this.letterPanel.setVisible(false);

        this.physics.pause();
        this.player.setVelocity(0, 0);
        this.input.keyboard.enabled = false;

        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.75)
            .setScrollFactor(0)
            .setDepth(2000);

        const finalImg = this.add.image(400, 280, 'birthdayFinal')
            .setScrollFactor(0)
            .setDepth(2001);

        const scale = Math.min(700 / finalImg.width, 450 / finalImg.height, 1);
        finalImg.setScale(scale);

        this.add.text(400, 535, '¡Feliz cumpleaños!', {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(2002);
    }

    update() {
        if (!this.player || this.finalShown || this.cardModalOpen) return;

        const speed = 160;

        const leftPressed = this.keys.left.isDown || this.keys.leftArrow.isDown;
        const rightPressed = this.keys.right.isDown || this.keys.rightArrow.isDown;
        const upPressed = this.keys.up.isDown || this.keys.upArrow.isDown;
        const downPressed = this.keys.down.isDown || this.keys.downArrow.isDown;

        let vx = 0;
        let vy = 0;
        let direction = this.player.lastDirection || 'down';

        if (leftPressed) {
            vx = -speed;
            direction = 'left';
        }

        if (rightPressed) {
            vx = speed;
            direction = 'right';
        }

        if (upPressed) {
            vy = -speed;
            direction = 'up';
        }

        if (downPressed) {
            vy = speed;
            direction = 'down';
        }

        this.player.setVelocity(vx, vy);

       if (vx !== 0 || vy !== 0) {

    this.player.lastDirection = direction;

    switch (direction) {

        case 'up':
            this.player.anims.play('walk-up', true);
            break;

        case 'left':
            this.player.anims.play('walk-left', true);
            break;

        case 'right':
            this.player.anims.play('walk-right', true);
            break;

        case 'down':
            this.player.anims.play('walk-down', true);
            break;
    }

} else {

    this.player.anims.stop();

    this.setFacingFrame(this.player.lastDirection);
}

        if (this.messageUntil && this.time.now > this.messageUntil) {
            this.hideMessage();
        }

        const nearbyPillar = this.findNearbyPillar();

        if (nearbyPillar) {
            if (gameState.heldItems.length > 0) {
                this.showPrompt('Pon el objeto en el pedestal y confirma con F');
            } else {
                this.showPrompt('Pon el objeto en el pedestal');
            }

            if (Phaser.Input.Keyboard.JustDown(this.keys.interact)) {
                this.depositItem(nearbyPillar);
            }
        } else {
            this.hidePrompt();
        }

        if (this.portalConfig) {
            this.portalConfig.tiles.forEach(tile => {
                const tileX = tile.x * TILE_SIZE + 16;
                const tileY = tile.y * TILE_SIZE + 16;

                const distancia = Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    tileX,
                    tileY
                );

                if (distancia < 16) {
                    if (this.portalConfig.destino === 'Mundo2') {
                        gameState.spawnX = 35 * TILE_SIZE + 16;
                        gameState.spawnY = 2 * TILE_SIZE + 16;
                    }

                    if (this.portalConfig.destino === 'Mundo3') {
                        gameState.spawnX = 0 * TILE_SIZE + 16;
                        gameState.spawnY = 36 * TILE_SIZE + 16;
                    }

                    if (this.portalConfig.destino === 'Cabaña') {
                        gameState.spawnX = 9 * TILE_SIZE + 16;
                        gameState.spawnY = 12 * TILE_SIZE + 16;
                    }

                    this.scene.start(this.portalConfig.destino);
                }
            });
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        new SceneMap(
            'Mundo1',
            'mundo1',
            {
                destino: 'Mundo2',
                tiles: [
                    { x: 37, y: 39 },
                    { x: 38, y: 39 }
                ]
            }
        ),
        new SceneMap(
            'Mundo2',
            'mundo2',
            {
                destino: 'Mundo3',
                tiles: [
                    { x: 47, y: 23 }
                ]
            }
        ),
        new SceneMap(
            'Mundo3',
            'mundo3',
            {
                destino: 'Cabaña',
                tiles: [
                    { x: 49, y: 3 },
                    { x: 49, y: 4 },
                    { x: 49, y: 5 },
                    { x: 49, y: 6 }
                ]
            }
        ),
        new SceneMap(
            'Cabaña',
            'cabaña',
            null
        )
    ]
};

new Phaser.Game(config);