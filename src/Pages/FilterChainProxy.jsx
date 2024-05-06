import Header from "../components/Header";

const FilterChainProxy = () => {
  return (
    <div>
      <Header text={"FilterChainProxy"} />
      <li>
        springSecurityFilterChain의 이름으로 생성되는 필터 빈으로 DelegationFilterProxy 으로 부터 요청을 위임받고
        보안처리 역할을 한다.
      </li>
      <li>하나이상의 SecurityFilterChain 객체들을 가지고있으며 </li>
      <li>요청URL 정보를 기준으로 적절한 필터체인을 선택하여 필터들을 호출한다.</li>
      <li>
        사용자의 요청을 필터 순서대로 호출함으로 보안기능을 동작시키고 필요시 직접 필터를 생성해서 기존의 필터 전 , 후
        로 추가 가능하다
      </li>
    </div>
  );
};

export default FilterChainProxy;
