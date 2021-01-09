import express, { Request, Response } from 'express';
import canvacord from 'canvacord';
import bodyParser from 'body-parser';

interface Body {
    avatar: string;
    exp: number;
    level: number;
    nextLevelXp: number;
    rank: number;
    presence: 'online' | 'idle' | 'dnd' | 'offline' | 'streaming';
    username: string;
    displayHexColor: string;
    discriminator: number | string;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    return res.json({ success: true });
});

app.post('/', async (req: Request, res: Response) => {
    const { avatar, exp, level, nextLevelXp, rank, presence, username, displayHexColor, discriminator }: Body = req.body;
    console.log(req.body);

    const rankCard = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(exp)
        .setLevel(level)
        .setRequiredXP(nextLevelXp)
        .setRank(rank)
        .setStatus(presence)
        .setFontSize(26)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(username, displayHexColor)
        .setDiscriminator(discriminator);

    const img = await rankCard.build();

    res.contentType('image/png');
    res.send(img);
});


app.listen(3000, () => {
    return console.log('Ready!');
});
