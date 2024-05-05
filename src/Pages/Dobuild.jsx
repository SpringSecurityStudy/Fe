import CodeBlock from "../components/CodeBlock";
import NavigateSpan from "../components/NavigateSpan";
import Header from "./Header";

const Dobuild = () => {
  const doBuild = `public abstract class AbstractSecurityBuilder<O> implements SecurityBuilder<O> {
    
    public final O build() throws Exception {
        if (this.building.compareAndSet(false, true)) {
            this.object = this.doBuild();
            return this.object;
        } else {
            throw new AlreadyBuiltException("This object has already been built");
        }
    }
  }`;

  const AbstractConfiguredSecurityBuilder = `public abstract class AbstractConfiguredSecurityBuilder<O, B extends SecurityBuilder<O>> extends AbstractSecurityBuilder<O> {
     protected final O doBuild() throws Exception {
        synchronized(this.configurers) {
            this.buildState = AbstractConfiguredSecurityBuilder.BuildState.INITIALIZING;
            this.beforeInit();
            this.init();
            this.buildState = AbstractConfiguredSecurityBuilder.BuildState.CONFIGURING;
            this.beforeConfigure();
            this.configure();
            this.buildState = AbstractConfiguredSecurityBuilder.BuildState.BUILDING;
            O result = this.performBuild();
            this.buildState = AbstractConfiguredSecurityBuilder.BuildState.BUILT;
            return result;
        }
    }
      private void init() throws Exception {
        Collection<SecurityConfigurer<O, B>> configurers = this.getConfigurers();
        Iterator var2 = configurers.iterator();
        ...
      }

   }`;

  return (
    <div>
      <Header text={"DoBuild"} />
      <CodeBlock text={doBuild} />
      <li>doBuild</li>
      <CodeBlock text={AbstractConfiguredSecurityBuilder} />

      <li>Init , Configuring , Building, Built 과정을통해서 초기화 과정이 완성된다. </li>
      <li>Init 을 하는과정에서 각 항목들을 초기화(객채를만들거나 만든객체를 공유하기위해)</li>
      <li>Configuring 과정중에는 필터, 핸들러 등을 만들고 설정을 한다. </li>
      <li>
        BUILDING 과정중에
        <NavigateSpan navi={"/perFormBuild"} text={" O result = this.performBuild() "} />
        에서 그동안 설정했던과정들이 보안필터로 등록이된다.{" "}
      </li>
      <li>doBuild 의 결과인 result로 빠져나와 http의 설정을 마치고</li>
      <li>
        <NavigateSpan navi={"/springSecurityInit"} text={"SecurityFilterChain "} />이 빈으로 생성된다
      </li>
    </div>
  );
};

export default Dobuild;
