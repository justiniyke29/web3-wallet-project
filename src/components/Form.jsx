import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const Form = () => {

  const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');

	const [isConnected, setIsConnected] = useState(false);

	const { ethereum } = window;

	const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				sethaveMetamask(false);
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			let balance = await provider.getBalance(accounts[0]);
			let bal = ethers.utils.formatEther(balance);

			setAccountAddress(accounts[0]);
			setAccountBalance(bal);
			setIsConnected(true);
		} catch (error) {
			setIsConnected(false);
		}
	};

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <header className="w-full max-w-md space-y-8">
      {haveMetamask ? (
        <div className="w-full max-w-md space-y-8">
          {isConnected ? (
            <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              <div className="flex flex-row">
                <h3>Wallet Address: </h3>
                <p className='text-blue-600'>
                  {accountAddress.slice(0, 4)}...
                  {accountAddress.slice(38, 42)}
                </p>
              </div>
              <div className="flex flex-row">
                <h3>Wallet Balance: </h3>
                <p className='text-blue-600'>{accountBalance}</p>
              </div>
            </div>
          ) : (
            <img className="mx-auto h-12 w-auto"
              src="https://play-lh.googleusercontent.com/78o3BRblptwErrUggLdNq9SMmHfkTqB0TW0B8ZshF2g7b8VrVJneDMVO12_FlFlWqMs"
              alt="metaMaskLogo" />
          )}

          {isConnected ? (
            <p className="font-medium text-indigo-600 hover:text-indigo-500">🎉 Connected Successfully</p>
          ) : (
            <button  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
             onClick={connectWallet}>
             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
              Connect to MetaMask
            </button>
          )}
        </div>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </header>
  </div>
  )
}

export default Form