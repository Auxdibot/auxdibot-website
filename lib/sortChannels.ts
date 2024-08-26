import { ChannelsType } from './types/ChannelsType';

export function sortChannels(channels: ChannelsType[]) {
    return channels
        .filter((i) => [0, 5].includes(i.type))
        .reduce((acc: (ChannelsType & { children: ChannelsType[] })[], i) => {
            const parent = acc.find((c) =>
                i.parentId ? c.id === i.parentId : c.id === ''
            );
            if (!parent) {
                if (!i.parentId) {
                    acc.push({
                        id: '',
                        name: '',
                        parentId: '',
                        type: 4,
                        rawPosition: -1,
                        children: [i],
                    });
                } else {
                    const dataParent = channels?.find(
                        (c) => c.id === i.parentId
                    );
                    if (dataParent) acc.push({ ...dataParent, children: [i] });
                }
            } else {
                parent.children.push(i);
            }

            return acc;
        }, []);
}
