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
yarn add three @react-three/fiber @react-three/drei leva
yarn add -D  @types/three
```

Start

```shell
npx nx dev frontend
```

Get individual morph targets for your Avatar:

https://models.readyplayer.me/6765b17acceb762d9021d41d.glb?morphTargets=Oculus Visemes

Additional doc:

- https://docs.readyplayer.me/ready-player-me/api-reference/avatars/morph-targets/oculus-ovr-libsync
- https://docs.readyplayer.me/ready-player-me/api-reference/rest-api/avatars/get-3d-avatars

Generate the Avatar component from the GLB file with `gltfjsx` library :

```shell
npx gltfjsx@latest apps/frontend/public/models/6765b17acceb762d9021d41d.glb -o apps/frontend/src/components/avatar.tsx -r public -t
```
