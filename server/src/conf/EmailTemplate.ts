export interface Email{
    subject: string;
    text: string;
}
export const CollaborationEmail: Email = {
    subject: 'Collaborate on favorite restaurants from your friend!',
    text: `
    Here is the url: {url} .
    You can collaborate on the favorite restaurants with your friend!
    `
}