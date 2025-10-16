import { useState } from "react";
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Tela inicial</Text>
    
      <Link href="/sqlite" asChild>
        <Button title="Clique para entrar(lá ele)" />
      </Link>
    </View>
  );
}