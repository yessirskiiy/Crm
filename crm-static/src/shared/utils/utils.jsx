export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-EN", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
};

export const calculateTimeLeft = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();

    const difference = due - now;

    if (difference <= 0) {
        return "Срок истёк"
    }

    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${daysLeft} days and ${hoursLeft} hours left`
};