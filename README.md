# hls-ido-pressure-sensor

extensions for using the pressure sensor demo flow in an HC or LS IDO.

## Setup

Org connections

```sh
sfdx force:auth:web:login -a hcido
sfdx force:auth:web:login -a lsido
```

## Dev

Pull the package components

```sh
sfdx force:source:retrieve -u hcido -n Patient_State
```

## Deploy

Push the package to the IDO:

```sh
sfdx force:source:deploy -u lsido -p ./Patient_State/
```