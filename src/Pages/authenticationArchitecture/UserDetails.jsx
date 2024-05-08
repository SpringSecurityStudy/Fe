import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import Toggle from "../../components/Toggle";

const userDetails = `
public interface UserDetails extends Serializable {
    //사용자의 비밀번호가 유효기간이 지났는지 확인하며 기간이 지난 비밀번호는 인증할 수 없다.
    boolean isCredentialsNonExpired();
    //사용자 계정의 유효기간이 지났는지를 나타내며 기간이 만료된 계정은 인증 할 수 없다.
    boolean isAccountNonExpired();
    //사용자가 잠겨 있는지 아닌지 잠긴 사용자는 인증 할 수 없다.
    boolean isAccountNonLocked();
    //사용자가 활성화 되었는지 비활성화 되었는지를 나타내며 비활성화된 사용자는 인증 할 수 없다.
    boolean isEnabled();
    // username , password, Authorities 를 반환하며 pw를 제외하고 null 을 반환 할 수 없다.
    String getUsername();
    String getPassword();
    Collection<? extends GrantedAuthority> getAuthorities();
}`;

const customAuccount = `
@Getter
@AllArgsConstructor
public class AccountDTO {
    private String username;
    private String password;
    private Collection<GrantedAuthority> authorities;
}
public class CustomUserDetails implements UserDetails {

    private final AccountDTO accountDTO;

    public CustomUserDetails(AccountDTO accountDTO) { this.accountDTO = accountDTO; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return accountDTO.getAuthorities(); }
    @Override
    public String getPassword() { return accountDTO.getPassword(); }
    @Override
    public String getUsername() { return accountDTO.getUsername(); }
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}
public class CustomUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountDTO accountDTO =
                new AccountDTO("user", "{noop}1111", List.of(new SimpleGrantedAuthority("ROLE_USER")));

        return new CustomUserDetails(accountDTO);
    }
}
`;

const UserDetails = () => {
  return (
    <div>
      <Header text={"UserDetails"} />
      <h3>UserDetails</h3>
      <li>사용자의 기본 정보를 저장하는 인터페이스 SpringSecurity 에서 사용하는 사용자 타입</li>
      <li>
        저장된 사용자 정보는 추후 인증절차에서 사용되기 위해 Authentication 객체에 포함되며 구현체로서 User클래스가
        제공된다.
      </li>
      <CodeBlock text={userDetails} />
      <Toggle text={"User 객체를 만들고나서 사용하는 방법예시"} code={customAuccount} />
    </div>
  );
};

export default UserDetails;
