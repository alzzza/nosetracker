const validateEmail = (email: string) => {
    const validDomains = ['@nhs.net', '@*.nhs.uk'];
    return validDomains.some(domain => email.endsWith(domain));
};

const handleLogin = async (email: string, password: string) => {
    if (!validateEmail(email)) {
        throw new Error('Email not accepted. Please contact admin.');
    }
    
    try {
        await account.createEmailSession(email, password);
        router.push('/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
    }
};
