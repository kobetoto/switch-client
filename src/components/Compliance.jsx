import styled from "@emotion/styled";

function Compliance() {
  return (
    <ComplianceStyled className="compliance">
      <h1>Vos données et votre vie privée sont notre priorité</h1>

      <p>
        Chez Switch, nous nous engageons à vous offrir un service clientèle de
        qualité supérieure. Nous comprenons que l'échange d'objets est une
        expérience personnelle et nous voulons rendre chaque transaction aussi
        fluide et agréable que possible pour vous. Nos représentants du service
        clientèle sont disponibles pour vous aider à chaque étape du processus,
        que vous souhaitiez naviguer dans l'application, rechercher un objet
        précis ou finaliser un échange. Notre objectif est de vous aider à
        trouver ce que vous cherchez et à faciliter des échanges sûrs, efficaces
        et pratiques. Chez Switch, votre satisfaction est notre priorité. Nous
        sommes toujours là pour répondre à vos questions et pour vous aider à
        maximiser l'utilisation de notre plateforme. Avec Switch, vous pouvez
        vous attendre à un service fiable, réactif et respectueux qui transcende
        les attentes traditionnelles du service clientèle. Essayez Switch
        aujourd'hui et découvrez une nouvelle manière d'échanger des objets en
        toute tranquillité. "Switch" est une plateforme novatrice qui
        révolutionne la manière dont les particuliers échangent des objets entre
        eux. Cependant, nous tenons à vous rassurer sur l'aspect "trustless" de
        notre application.
      </p>
      <p>
        En termes de technologie blockchain, "trustless" signifie que vous
        n'avez pas besoin de faire confiance à une tierce partie pour que le
        système fonctionne correctement - le système lui-même garantit la
        sécurité et l'intégrité de toutes les transactions. Dans le contexte de
        la protection des données, nous sommes pleinement conscients de
        l'importance de votre vie privée. L'affichage des adresses e-mail est
        une fonctionnalité de notre site conçue pour faciliter la communication
        entre les utilisateurs. Nous comprenons que cela puisse préoccuper
        certains utilisateurs, c'est pourquoi nous avons mis en place des
        mesures rigoureuses pour assurer la sécurité de vos informations. Nous
        appliquons des protocoles de sécurité de pointe pour protéger vos
        données et nous nous conformons strictement à toutes les réglementations
        pertinentes en matière de protection des données. De plus, nous donnons
        à chaque utilisateur le contrôle total sur ses informations.{" "}
      </p>

      <p>
        Vous avez le droit à tout moment de choisir de ne pas afficher votre
        adresse e-mail. C'est vous qui décidez de la manière dont vos
        informations sont utilisées. Nous sommes convaincus que Switch est une
        superbe application qui offre un moyen sûr, sécurisé et pratique
        d'échanger des objets entre particuliers. Nous nous engageons à
        maintenir un haut niveau de conformité et de sécurité pour protéger nos
        utilisateurs.
      </p>
    </ComplianceStyled>
  );
}

const ComplianceStyled = styled.div`
  color: black;
  text-align: center;
  margin-top: 42px;
  margin-bottom: 126px;
  margin-right: 42px;
  margin-left: 42px;

  h1 {
    font-size: 42px;
    color: #ef4f67;
    margin-bottom: 126px;
  }

  p {
    text-align: left;
    letter-spacing: 2px;
    word-spacing: 8px;
  }
`;

export default Compliance;
