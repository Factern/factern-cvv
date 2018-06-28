CVVerify bootstrap script
=========================

This node script bootstraps a login to be used as a Credential Provider account. 

Execute `node bootstrap/index.js -h` to get usage instructions:

    Usage: index [options]
    
    Options:
    
    -j, --jwt [jwt]      Auth0 access token
    -l, --login [login]  Factern login ID 
    -n, --name [name]    Name of the Credential Provider
    -h, --help           output usage information

On a successful execution, the script produces a `constant.json` file that should be copied
to the `src/factern/` directory before the GraphQL application is run.
