import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";

const authorizationFilter = `
public class AuthorizationFilter extends GenericFilterBean {
    ...
    private Authentication getAuthentication() {
        //1. Supplier안에있는 context중 Authentication 객체를꺼낸다
        Authentication authentication = this.securityContextHolderStrategy.getContext().getAuthentication();
        if (authentication == null) {
            throw new AuthenticationCredentialsNotFoundException("An Authentication object was not found in the SecurityContext");
        } else {
            return authentication;
        }
    }

}

`;

const AuthorizationFilter = () => {
  return (
    <div>
      <Header text={"AuthorizationFilter"} />
      <CodeBlock text={authorizationFilter} />
    </div>
  );
};

export default AuthorizationFilter;
