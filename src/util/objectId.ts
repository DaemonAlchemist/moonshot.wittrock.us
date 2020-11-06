const objIdMap=new WeakMap<object>();
let objectCount = 0;

export const objectId = (object:object):number => {
    if (!objIdMap.has(object)) {
        objIdMap.set(object,++objectCount);
    }
    return objIdMap.get(object);
}
