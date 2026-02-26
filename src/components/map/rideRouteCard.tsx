import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import EditIcon from "../../../assets/icons/edit";
import AddIcon from "../../../assets/icons/add";
import { commonStyles } from "../../styles/commonStyles";
import useTheme from "../../hooks/useThemes";
import { FONT_SIZES } from "../../constants/sizes";

type RideRouteCardProps = {
  pickup?: string;
  destination?: string;
  stops?: string[];

  showPickupEdit?: boolean;
  showDestinationEdit?: boolean;
  showAddStop?: boolean;
  showStops?: boolean;
  showStopsEdit?: boolean;
  onAddStop?: () => void;
  onEditPickup?: () => void;
  onEditDestination?: () => void;
  onEditStop?: (stopId: string) => void;
};

type RowProps = {
  height: number;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  showEdit?: boolean;
  onEdit?: () => void;
  rightComponent?: () => React.ReactNode;
};

type MarkerProps = {
  colors: any;
  ROW_HEIGHT: number;
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function RideRouteCard({
  pickup,
  destination,
  stops = [],
  showPickupEdit = true,
  showDestinationEdit = true,
  showAddStop = true,
  showStops = true,
  showStopsEdit = true,
  onEditPickup,
  onEditDestination,
  onAddStop,
  onEditStop,
}: RideRouteCardProps) {
  const ROW_HEIGHT = 64;
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  const markerCount =
    1 + // pickup
    (stops.length > 0 ? stops.length : showAddStop ? 1 : 0) +
    1; // destination

  const railHeight = markerCount * ROW_HEIGHT;

  return (
    <View style={styles.container}>
      {/* LEFT RAIL */}
      <View style={styles.leftRail}>
        <View
          style={[
            styles.railLine,
            {
              backgroundColor: colors.titleText,
              height: railHeight - ROW_HEIGHT,
            },
          ]}
        />

        <RailPickupMarker colors={colors} ROW_HEIGHT={ROW_HEIGHT} />

        {showStops &&
          stops.map((_, index) => (
            <RailStopMarker
              key={`stop-${index}`}
              colors={colors}
              ROW_HEIGHT={ROW_HEIGHT}
            />
          ))}

        {showAddStop && stops.length === 0 && (
          <RailStopMarker colors={colors} ROW_HEIGHT={ROW_HEIGHT} />
        )}

        <RailDestinationMarker colors={colors} ROW_HEIGHT={ROW_HEIGHT} />
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.content}>
        <Row
          height={ROW_HEIGHT}
          title={pickup || "pickup location"}
          showEdit={showPickupEdit}
          onEdit={onEditPickup}
          titleStyle={[
            commonStyling.title,
            {
              fontSize: FONT_SIZES.SUBTITLE,
              color: showPickupEdit ? colors.titleText : colors.inputText,
            },
          ]}
        />

        {showStops &&
          stops.map((stop, index) => (
            <Row
              key={`stop-value-${index}`}
              height={ROW_HEIGHT}
              title={stop}
              titleStyle={[commonStyling.subtitle]}
              showEdit={showStopsEdit}
              onEdit={() => {
                onEditStop?.(stop.stop_id);
              }}
            />
          ))}

        {showAddStop && stops.length === 0 && (
          <Row
            height={ROW_HEIGHT}
            title="Add a stop"
            titleStyle={[commonStyling.subtitle]}
            rightComponent={() => (
              <TouchableOpacity
                onPress={onAddStop}
                style={[styles.addBtn, { backgroundColor: colors.stroke }]}
              >
                <AddIcon color={colors.titleText} />
              </TouchableOpacity>
            )}
          />
        )}

        <Row
          height={ROW_HEIGHT}
          title={destination || "Select destination"}
          showEdit={showDestinationEdit}
          onEdit={onEditDestination}
          titleStyle={[commonStyling.title, { fontSize: FONT_SIZES.SUBTITLE }]}
        />
      </View>
    </View>
  );
}

/* ---------------- RAIL COMPONENTS ---------------- */

const RailPickupMarker = ({ colors, ROW_HEIGHT }: MarkerProps) => (
  <View style={[styles.circleRow, { height: ROW_HEIGHT }]}>
    <View style={[styles.topOuterRing, { backgroundColor: colors.titleText }]}>
      <View style={[styles.topWhiteRing, { backgroundColor: colors.krGreen }]}>
        <View
          style={[
            styles.topInnerDot,
            { backgroundColor: colors.surfacePrimary },
          ]}
        />
      </View>
    </View>
  </View>
);

const RailStopMarker = ({ colors, ROW_HEIGHT }: MarkerProps) => (
  <View style={[styles.circleRow, { height: ROW_HEIGHT }]}>
    <View
      style={[
        styles.middleOuterRing,
        { backgroundColor: colors.surfacePrimary, borderColor: colors.stroke },
      ]}
    >
      <View
        style={[styles.middleInner, { backgroundColor: colors.surfacePrimary }]}
      />
    </View>
  </View>
);

const RailDestinationMarker = ({ colors, ROW_HEIGHT }: MarkerProps) => (
  <View style={[styles.circleRow, { height: ROW_HEIGHT }]}>
    <View
      style={[
        styles.bottomOuterRing,
        {
          borderColor: colors.titleText,
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <View
        style={[styles.bottomInner, { backgroundColor: colors.surfacePrimary }]}
      />
    </View>
  </View>
);

/* ---------------- ROW COMPONENT ---------------- */

const Row = ({
  height,
  title,
  titleStyle,
  showEdit,
  onEdit,
  rightComponent,
}: RowProps) => {
  return (
    <View style={[styles.row, { height }]}>
      <View style={styles.textWrap}>
        <Text style={[styles.title, titleStyle]} numberOfLines={2}>
          {title}
        </Text>
      </View>

      {showEdit && (
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <EditIcon />
        </TouchableOpacity>
      )}

      {rightComponent && rightComponent()}
    </View>
  );
};

/* ---------------- STYLES ---------------- */

const RAIL_WIDTH = 36;
const DOT_OUTER = 20;
const DOT_INNER = 8;
const MID_OUTER = 18;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  leftRail: {
    width: RAIL_WIDTH,
    alignItems: "center",
  },
  railLine: {
    position: "absolute",
    top: 32,
    width: 2,
    left: RAIL_WIDTH / 2 - 1,
  },
  circleRow: {
    width: RAIL_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  topOuterRing: {
    width: DOT_OUTER,
    height: DOT_OUTER,
    borderRadius: DOT_OUTER / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  topWhiteRing: {
    width: DOT_OUTER - 8,
    height: DOT_OUTER - 8,
    borderRadius: (DOT_OUTER - 8) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  topInnerDot: {
    width: DOT_INNER,
    height: DOT_INNER,
    borderRadius: DOT_INNER / 2,
  },
  middleOuterRing: {
    width: MID_OUTER,
    height: MID_OUTER,
    borderRadius: MID_OUTER / 2,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  middleInner: {
    width: MID_OUTER - 8,
    height: MID_OUTER - 8,
    borderRadius: (MID_OUTER - 8) / 2,
  },
  bottomOuterRing: {
    width: DOT_OUTER,
    height: DOT_OUTER,
    borderRadius: DOT_OUTER / 2,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomInner: {
    width: DOT_OUTER - 8,
    height: DOT_OUTER - 8,
    borderRadius: (DOT_OUTER - 8) / 2,
  },
  content: {
    flex: 1,
    paddingLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  textWrap: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: FONT_SIZES.BODY,
  },
  iconBtn: {
    padding: 6,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
