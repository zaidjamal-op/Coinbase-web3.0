import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId : 'xmbp0gtl',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skUUmRjFHB3U1gcWkDJnkE7j2ACNJn4h7Nqk92wNjckp6mDtrkPz7va56BKhlCtU73huDn78YCM2W6epnvFaY3rO95WT7nmamtqjpLS8h1VWacSgiqdUYD6yAgz8Z5IlmGQp8ORqMH5dSHoDRnamGPexzFApQM6BcbqXNb9favwrp9fboIun',
    useCdn: false,
})