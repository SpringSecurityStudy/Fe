import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
const TokenBasedRememberMeServices = `
public class TokenBasedRememberMeServices extends AbstractRememberMeServices {
    public void onLoginSuccess(HttpServletRequest request, HttpServletResponse response, Authentication successfulAuthentication) {
        String username = this.retrieveUserName(successfulAuthentication);
        String password = this.retrievePassword(successfulAuthentication);
        if (!StringUtils.hasLength(username)) {
            this.logger.debug("Unable to retrieve username");
        } else {
            if (!StringUtils.hasLength(password)) {
                UserDetails user = this.getUserDetailsService().loadUserByUsername(username);
                password = user.getPassword();
                if (!StringUtils.hasLength(password)) {
                    this.logger.debug("Unable to obtain password for user: " + username);
                    return;
                }
            }

            int tokenLifetime = this.calculateLoginLifetime(request, successfulAuthentication);
            long expiryTime = System.currentTimeMillis();
            expiryTime += 1000L * (long)(tokenLifetime < 0 ? 1209600 : tokenLifetime);
            String signatureValue = this.makeTokenSignature(expiryTime, username, password, this.encodingAlgorithm);
            this.setCookie(new String[]{username, Long.toString(expiryTime), this.encodingAlgorithm.name(), signatureValue}, tokenLifetime, request, response);
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Added remember-me cookie for user '" + username + "', expiry: '" + new Date(expiryTime) + "'");
            }

        }
    }
}
`;

const RememberMeAuthenticationToken = () => {
  return (
    <div>
      <Header text={"RememberMeAuthenticationToken"} />
      <CodeBlock text={TokenBasedRememberMeServices} />
    </div>
  );
};

export default RememberMeAuthenticationToken;
