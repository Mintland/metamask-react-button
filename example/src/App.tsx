import { withMetaMask } from "metamask-react";

const Button = (props: any) => {
    // console.log(props);
    const { requestAccounts, requestChainId, requestSign } = props;

    const handleClick = async () => {
        const chainId = await requestChainId();
        console.log(chainId);
        const accounts = await requestAccounts();
        console.log(accounts);
        const signature = await requestSign("Demo");
        console.log(signature);
    };

    return <button onClick={handleClick}>Click Me</button>;
};

const MetaMaskConnectButton = withMetaMask(Button);

function App() {
    return (
        <div className="App">
            <MetaMaskConnectButton />
        </div>
    );
}

export default App;
