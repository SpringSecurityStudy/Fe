import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";

const daoAuthenticationProvider = `
public class DaoAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
    private static final String USER_NOT_FOUND_PASSWORD = "userNotFoundPassword";
    private PasswordEncoder passwordEncoder;
    private volatile String userNotFoundEncodedPassword;
    private UserDetailsService userDetailsService;
    private UserDetailsPasswordService userDetailsPasswordService;

    protected final UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        this.prepareTimingAttackProtection();

        try {
            UserDetails loadedUser = this.getUserDetailsService().loadUserByUsername(username);
            if (loadedUser == null) {
                throw new InternalAuthenticationServiceException("UserDetailsService returned null, which is an interface contract violation");
            } else {
                return loadedUser;
            }
        } catch (UsernameNotFoundException var4) {
            UsernameNotFoundException ex = var4;
            this.mitigateAgainstTimingAttack(authentication);
            throw ex;
        } catch (InternalAuthenticationServiceException var5) {
            InternalAuthenticationServiceException ex = var5;
            throw ex;
        } catch (Exception var6) {
            Exception ex = var6;
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex);
        }
    }
}
`;

const DaoAuthenticationProvider = () => {
  return (
    <div>
      <Header text={"DaoAuthenticationProvider"} />
      <CodeBlock text={daoAuthenticationProvider} />
    </div>
  );
};

export default DaoAuthenticationProvider;
