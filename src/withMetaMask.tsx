// src/withMetaMask.tsx

import React from "react";
import { ethers } from "ethers";
import detectWalletProvider, { Wallet } from "./detectWalletProvider";

interface Error {
    code: number;
    message: string;
    stack: any;
}

export interface WithMetaMaskState {
    isInstalled: boolean;
    isConnected: boolean;
    error: Error | undefined;
}

export default function withMetaMask(WrapperComponent: any) {
    // eslint-disable-next-line react/display-name
    return class extends React.Component<any, WithMetaMaskState> {
        provider: ethers.providers.Web3Provider | undefined = undefined;

        constructor(props: any) {
            super(props);

            this.state = {
                isInstalled: false,
                isConnected: false,
                error: undefined,
            };
        }

        componentDidMount() {
            detectWalletProvider(Wallet.Metamask)
                .then((provider) => {
                    this.provider = new ethers.providers.Web3Provider(
                        provider,
                        "any"
                    );
                    this.setState({
                        isInstalled: true,
                    });
                })
                .catch((error) => {
                    console.warn(error);
                    this.setState({
                        isInstalled: false,
                    });
                });
        }

        send(method: string, params: any = []) {
            if (this.provider === undefined) {
                throw new Error("MetaMask is not installed");
            }

            return this.provider.send(method, params);
        }

        requestChainId = async () => {
            try {
                const response = await this.send("eth_chainId");
                return response;
            } catch (error) {
                this.setState({
                    error,
                });
                return -1;
            }
        };

        requestAccounts = async () => {
            try {
                this.send("wallet_requestPermissions", [
                    {
                        eth_accounts: {},
                    },
                ]);
                const response = await this.send("eth_requestAccounts");

                this.setState({
                    isConnected: true,
                });
                return response;
            } catch (error) {
                // this.error = error;
                this.setState({
                    isConnected: false,
                    error,
                });
                return undefined;
            }
        };

        requestSign = async (message: string) => {
            const { isConnected } = this.state;

            if (!isConnected) return -1;

            if (this.provider === undefined) {
                throw new Error("MetaMask is not installed");
            }

            try {
                const signer = this.provider.getSigner();
                return await signer.signMessage(message);
            } catch (error) {
                this.setState({
                    error,
                });
                return undefined;
            }
        };

        render() {
            const props = this.props;
            const { error, isConnected, isInstalled } = this.state;

            return (
                <WrapperComponent
                    requestSign={this.requestSign}
                    requestAccounts={this.requestAccounts}
                    requestChainId={this.requestChainId}
                    isConnected={isConnected}
                    error={error}
                    isInstalled={isInstalled}
                    {...props}
                />
            );
        }
    };
}
