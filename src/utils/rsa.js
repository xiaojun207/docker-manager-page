
import JSEncrypt from 'jsencrypt'

// 公钥key
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1sWwK9qQDett8Sw4NL4\n' +
  '22RBT4MZiPY9Y/BCdl8KOgWQ+lDcnPVgn355HdZE+h6ADduEtVn2C2N6uD5nLOE3\n' +
  'eDpsUPKny5djLjYfsFJxQMTKG4vU9AMFItsHK45r3xA1ByMjsA9Ti7Gwzgd9w+tw\n' +
  '+ZE67JGNNtr00aIvEMyZlc7grG/4mT51AovJTt+ThBS9IWzemhSVDP8dHEI+XHK5\n' +
  'pL88MXPTkEXO1WheTlL7iDPXvo4/50a2osr17EFoGzC/aEG3PaBdPVNEFl7izH7J\n' +
  'F6T2/V1QnwpgKHojnCReB7A+vP3VCqZaMTXoBROnVrRuKsm1AS2KBrygwg1GvZwH\n' +
  'FwIDAQAB'

const encrypt = new JSEncrypt()

export default {
  /**
   * 初始化后端公钥
   */
  initEncrypt() {
    encrypt.setPublicKey(publicKey)
  },

  /**
   * 进行加密
   * @param value
   */
  toEncrypt(value) {
    return encrypt.encrypt(value)
  },

  /**
   * 进行加密
   * @param value
   */
  toDecrypt(value) {
    return encrypt.decrypt(value)
  }
}
