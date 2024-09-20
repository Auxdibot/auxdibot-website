export const hasVoted = (voted_date: Date): boolean => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return voted_date.valueOf() >= oneWeekAgo.valueOf();
};
