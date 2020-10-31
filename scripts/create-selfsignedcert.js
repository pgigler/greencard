const fs = require("fs");
const path = require("path");

const forge = require("node-forge");
const pki = forge.pki;

function createCertificate(dnsname, destpath) {
	// generate a keypair or use one you have already
	const keys = pki.rsa.generateKeyPair(2048);

	// create a new certificate
	const cert = pki.createCertificate();

	// fill the required fields
	cert.publicKey = keys.publicKey;
	//cert.serialNumber = '01';
	cert.validity.notBefore = new Date();
	cert.validity.notAfter = new Date();
	cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

	// use your own attributes here, or supply a csr (check the docs)
	const attrs = [
		{
			name: "commonName",
			value: dnsname,
		},
		{
			name: "organizationName",
			value: "Dgital",
		},
	];

	// here we set subject and issuer as the same one
	cert.setSubject(attrs);
	cert.setIssuer(attrs);
	cert.setExtensions([
		/* {
             name: 'basicConstraints',
             cA: true
         },*/
		{
			name: "keyUsage",
			keyCertSign: false,
			digitalSignature: true,
			nonRepudiation: false,
			keyEncipherment: false,
			dataEncipherment: false,
		},
		{
			name: "extKeyUsage",
			serverAuth: true,
			clientAuth: true,
			codeSigning: false,
			emailProtection: false,
			timeStamping: false,
		},
		/*  {
              name: 'nsCertType',
              client: true,
              server: true,
              email: true,
              objsign: true,
              sslCA: true,
              emailCA: true,
              objCA: true
          },*/
		{
			name: "subjectAltName",
			altNames: [
				/*   {
                       type: 6, // URI
                       value: 'http://example.org/webid#me'
                   },
                   {
                       type: 7, // IP
                       ip: '127.0.0.1'
                   }*/
				{
					type: 2,
					value: dnsname,
				},
			],
		},
		{
			name: "subjectKeyIdentifier",
		},
	]);

	// the actual certificate signing
	cert.sign(keys.privateKey, forge.md.sha256.create());

	// now convert the Forge certificate to PEM format
	const pem = pki.certificateToPem(cert);
	const certfile = path.join(destpath, dnsname + ".crt");
	fs.writeFileSync(certfile.replace(/\*/g, ""), pem);
	// eslint-disable-next-line no-console
	console.log(certfile);

	const pkpem = pki.privateKeyToPem(keys.privateKey);
	const keyfile = path.join(destpath, dnsname + ".key");
	fs.writeFileSync(keyfile.replace(/\*/g, ""), pkpem);
	// eslint-disable-next-line no-console
	console.log(keyfile);
}

module.exports = {
	createCertificate,
};
