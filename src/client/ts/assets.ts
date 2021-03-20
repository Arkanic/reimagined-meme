import Logger from "../ts/logger";

let logger:Logger = new Logger("asset loader", "green");

let assetNames:Array<AssetData> = handleRequireContext(require.context("../assets/", false, /\.(png|jpe?g|svg|gif|webp)$/));
let assets:{[unit:string]:HTMLImageElement} = {};

const downloadPromise:Promise<Array<void>> = Promise.all(assetNames.map(downloadAsset));

interface AssetData {
    name:string;
    url:string;
}

function handleRequireContext(r:__WebpackModuleApi.RequireContext):Array<AssetData> {
    let names:Array<string> = r.keys();
    let urls:Array<string> = r.keys().map(r) as Array<string>;

    let assetData:Array<AssetData> = [];
    for(let i in names) {
        assetData.push({
            name:names[i],
            url:urls[i]
        });
    }

    return assetData;
}

function downloadAsset(meta:AssetData):Promise<void> {
    return new Promise(resolve => {
        const asset:HTMLImageElement = new Image();
        asset.onload = () => {
            let slashSplit:Array<string> = meta.url.split("/");
            let hash:string = slashSplit[slashSplit.length-1].split(".")[0];
            logger.log(`Successfully downloaded ${hash}`);
            assets[meta.name] = asset;
            resolve();
        }
        asset.src = meta.url;
    });
}

export const downloadAssets = () => downloadPromise;
export const getAsset = (assetName:string) => assets[assetName];