import Header from "../Pages/Header";
import CodeBlock from "./CodeBlock";
const SecurityProperties = `public class SecurityProperties {
     public static class User {
        private String name = "user";
        private String password = UUID.randomUUID().toString();
     }
}`;
const UserDetailsServiceAutoConfiguration = `public class UserDetailsServiceAutoConfiguration {
@Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager(SecurityProperties properties, ObjectProvider<PasswordEncoder> passwordEncoder) {
        SecurityProperties.User user = properties.getUser();
        List<String> roles = user.getRoles();
        return new InMemoryUserDetailsManager(new UserDetails[]{
            User.withUsername(user.getName())
            .password(this.getOrDeducePassword(user, (PasswordEncoder)passwordEncoder.getIfAvailable()))
            .roles(StringUtils.toStringArray(roles)).build()});
    }
}`;
const BasicUserInfo = () => {
  return (
    <div className="">
      <Header text={"기본 아이디, 비밀번호 초기화"} />
      <CodeBlock text={SecurityProperties} />
      <li>이렇게 만들어진 username 과 password는</li>
      <CodeBlock text={UserDetailsServiceAutoConfiguration} />
      <li>위 클래스의 빈으로 만들어져 등록이된다</li>
    </div>
  );
};

export default BasicUserInfo;
