import CodeBlock from "../components/CodeBlock";
import Header from "./Header";

const PerFormBuild = () => {
  const HttpSecurity = `
    public final class HttpSecurity {
        protected DefaultSecurityFilterChain performBuild() {
        ExpressionUrlAuthorizationConfigurer<?> expressionConfigurer = (ExpressionUrlAuthorizationConfigurer)this.getConfigurer(ExpressionUrlAuthorizationConfigurer.class);
        AuthorizeHttpRequestsConfigurer<?> httpConfigurer = (AuthorizeHttpRequestsConfigurer)this.getConfigurer(AuthorizeHttpRequestsConfigurer.class);
        boolean oneConfigurerPresent = expressionConfigurer == null ^ httpConfigurer == null;
        Assert.state(expressionConfigurer == null && httpConfigurer == null || oneConfigurerPresent, "authorizeHttpRequests cannot be used in conjunction with authorizeRequests. Please select just one.");
        this.filters.sort(OrderComparator.INSTANCE);
        List<Filter> sortedFilters = new ArrayList(this.filters.size());
        Iterator var5 = this.filters.iterator();

        while(var5.hasNext()) {
            Filter filter = (Filter)var5.next();
            sortedFilters.add(((OrderedFilter)filter).filter);
        }

        return new DefaultSecurityFilterChain(this.requestMatcher, sortedFilters);
    }
    }

    `;
  const SecurityFilterChain = `public interface SecurityFilterChain {
    boolean matches(HttpServletRequest request);

    List<Filter> getFilters();
}`;
  return (
    <div>
      <Header text={"performBuild"} />
      <CodeBlock text={HttpSecurity} />
      <li>빌드를 완성하고</li>
      <li>필터들을 생성한후에 SecurityFilterChain 을 생성한다.</li>
      <li>인자값으로는 requestMatcher 와 Filter목록을 넘겨준다</li>
      <li>requestMatcher는 현재요청이 FilterChain에 적합한요청인지 판단하는역할</li>
      <CodeBlock text={SecurityFilterChain} />
      <li>HttpSecurity 의 최종완성인 SecurityFilterChain 빈이 생성되어 HttpSecurity의 과정은끝이난다.</li>
    </div>
  );
};

export default PerFormBuild;
