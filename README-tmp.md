Setup :

```shell
npx create-nx-workspace@latest 3js-react-virtual-assistant --preset=apps --nxCloud=github --packageManager=yarn # packageManager option to be verified
cd 3js-react-virtual-assistant
npx nx add @nx/next
npx nx g @nx/next:application apps/frontend --style=scss --linter=eslint --unitTestRunner=none --e2eTestRunner=none --appDir=true --src=true
```

Ajout Tailwind :

```shell
npx nx g @nx/react:setup-tailwind --project=frontend
```

Enable VSCode Plugin:

https://nextjs.org/docs/app/getting-started/installation#ide-plugin

Three JS :

```shell
yarn add three @react-three/fiber @react-three/drei@9.75 leva
# !!! @To_investigate: smooth animations transitions don't work with @react-three/drei > 9.75
yarn add -D @types/three
```

Start

```shell
npx nx dev frontend
```

Get your favorite avatar with ARKit & Oculus Visemes compatible morph targets:

https://models.readyplayer.me/6765b17acceb762d9021d41d.glb?morphTargets=ARKit,Oculus Visemes

Additional doc:

- https://docs.readyplayer.me/ready-player-me/api-reference/avatars/morph-targets/oculus-ovr-libsync
- https://docs.readyplayer.me/ready-player-me/api-reference/rest-api/avatars/get-3d-avatars

Generate the Avatar component from the GLB file with `gltfjsx` library :

```shell
npx gltfjsx@latest apps/frontend/public/models/6765b17acceb762d9021d41d.glb -o apps/frontend/src/components/avatar.tsx -r public -t
```

Conversion MP3 -> WAV/OGG:

```shell
ffmpeg -y -i apps/frontend/public/audios/${message}.mp3 apps/frontend/public/audios/${message}.wav
ffmpeg -y -i apps/frontend/public/audios/${message}.mp3 apps/frontend/public/audios/${message}.ogg
```

Online utility: https://convertio.co

Generate mouthCues Json file from WAV audio file, that will contain all the data for the lips synchronisation:

```shell
./bin/rhubarb -f json -o apps/frontend/public/audios/${message}.json apps/frontend/public/audios/${message}.wav -r phonetic
./bin/rhubarb -f json -o apps/frontend/public/audios/${message}.json apps/frontend/public/audios/${message}.ogg -r phonetic
```
