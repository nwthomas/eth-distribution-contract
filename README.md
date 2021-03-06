### NOTE: This contract is completely unaudited. If you deploy and use this, you do so at your own risk!

# Ethereum Distribution Contract

The purpose of this contract is to allow users to contribute Ether and then distribute it back out evenly.

Here is the initial problem description:

> The smart contract accepts contributions in ETH from people and then divides the ETH up evenly and distributes it to the people who contributed.
>
> The maximum contribution per address is 10 ETH and should be configurable, but only be able to be changed by the owner of the contract.
>
> The owner should be able to transfer ownership to someone else of their choice."

To facilitate this, I wrote a contract and supplemented it using Open Zeppelin's contracts to create an ownable contract that allows a fixed, certain number owners. to contribute up to a certain customizable maximum amount of ether. This ether can then be distributed back out evenly to these addresses on the owner's function call.

## Open Questions

- How do I test running a transaction while another is processing (e.g. to test my mutext)?
