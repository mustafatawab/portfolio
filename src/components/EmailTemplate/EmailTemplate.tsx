
interface EmailTemplateProps {
    fullname: string;
    message: string
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    fullname, message
}) => (
    <div>
        <h1>Welcome, {fullname}!</h1>
        <div>
            {message}
        </div>
    </div>
);


export default EmailTemplate;