export const isFreeUser = ({ groupPermission }: { groupPermission: string | null }): boolean => {
    return groupPermission === 'free';
};
